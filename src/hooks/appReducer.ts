import type {
  UserPreferences,
  State,
  Action,
} from "@/types/types";
import { createQueryString } from "@/lib/createQueryString";

export const defaultUserPreferences: UserPreferences = {
  pageTheme: "light",
  formData: {
    autoskip: true,
    autoskipDelay: 2000,
    queryParams: {
      limit: true,
      derivative: true,
      integral: true,
      easy: true,
      medium: true,
      hard: false,
      legendary: false,
    },
  },
};

export const defaultInitialState: State = {
  userPreferences: defaultUserPreferences,
  pageTheme: defaultUserPreferences.pageTheme,
  formData: defaultUserPreferences.formData,
  queryString: createQueryString(defaultUserPreferences.formData.queryParams),
  response: null,
  mobileFormVisible: false,
  dialogVisible: false,
};

export function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_USER_PREFERENCES": {
      try {
        const stored = localStorage.getItem("userPreferences");

        if (stored) {
          const savedPreferences: UserPreferences = JSON.parse(stored);
          
          const mergedPreferences: UserPreferences = {
            pageTheme: savedPreferences.pageTheme || defaultUserPreferences.pageTheme,
            formData: {
              ...defaultUserPreferences.formData,
              ...savedPreferences.formData,
              queryParams: {
                ...defaultUserPreferences.formData.queryParams,
                ...savedPreferences.formData?.queryParams
              }
            }
          };

          const newQueryString = createQueryString(mergedPreferences.formData.queryParams);
        
          try {
            localStorage.setItem("userPreferences", JSON.stringify(mergedPreferences));
          } catch (saveError) {
            console.error("Error saving loaded preferences:", saveError);
          }

          return {
            ...state,
            userPreferences: mergedPreferences,
            pageTheme: mergedPreferences.pageTheme,
            formData: mergedPreferences.formData,
            queryString: newQueryString,
          };
        }

        try {
          localStorage.setItem("userPreferences", JSON.stringify(defaultUserPreferences));
        } catch (saveError) {
          console.error("Error saving default preferences:", saveError);
        }

        return state;
      } catch (error) {
        console.error("Error loading user preferences:", error);
        return state;
      }
    }

    case "UPDATE_USER_PREFERENCES": {
      const newUserPreferences = action.payload;
      const newQueryString = createQueryString(newUserPreferences.formData.queryParams);

      try {
        localStorage.setItem("userPreferences", JSON.stringify(newUserPreferences));
      } catch (error) {
        console.error("Error saving user preferences:", error);
      }

      return {
        ...state,
        userPreferences: newUserPreferences,
        pageTheme: newUserPreferences.pageTheme,
        formData: newUserPreferences.formData,
        queryString: newQueryString,
      };
    }

    case "TOGGLE_PAGE_THEME": {
      const newPageTheme = (state.pageTheme === "dark") ? "light" : "dark";
      
      try {
        const currentPreferences = JSON.parse(localStorage.getItem("userPreferences") || '{}');
        const updatedPreferences = {
          ...currentPreferences,
          pageTheme: newPageTheme
        };
        localStorage.setItem("userPreferences", JSON.stringify(updatedPreferences));
      } catch (error) {
        console.error("Error saving theme preference:", error);
      }

      return {
        ...state,
        pageTheme: newPageTheme,
      };
    }

    case "UPDATE_FORM_DATA": {
      const newFormData = action.payload;
      
      try {
        const currentPreferences = JSON.parse(localStorage.getItem("userPreferences") || '{}');
        const updatedPreferences = {
          ...currentPreferences,
          formData: newFormData
        };
        localStorage.setItem("userPreferences", JSON.stringify(updatedPreferences));
      } catch (error) {
        console.error("Error saving form data:", error);
      }

      return {
        ...state,
        formData: newFormData,
      };
    }

    case "UPDATE_QUERY_STRING": {
      const newQueryString = action.payload;
      return {
        ...state,
        queryString: newQueryString,
      }
    }

    case "UPDATE_RESPONSE": {
      const newResponse = action.payload;
      return {
        ...state,
        response: newResponse,
      };
    }

    case "TOGGLE_MOBILE_FORM": {
      return {
        ...state,
        mobileFormVisible: !state.mobileFormVisible,
      };
    }

    case "TOGGLE_DIALOG": {
      return {
        ...state,
        dialogVisible: !state.dialogVisible,
      };
    }

    default: {
      return state;
    }
  }
}
