import React, { createContext, useContext, useReducer } from 'react';
import { ResponseValues } from 'axios-hooks';
import { apiRoutes, GetGlyphsRequest, GlyphsResponse, ApiError, PaginationRequest } from '@sin-nihongo/api-interfaces';
import { GetGlyphsParams } from '@sin-nihongo/sin-nihongo-params';
import { useFetch } from '../../utils/axios';
import { ValidationProvider } from '../../utils/useValidation';

type Store = {
  searchQuery: GetGlyphsRequest & PaginationRequest;
  rowQuery?: GetGlyphsRequest;
  currentPage: number;
  deleteId: string;
  deleteDialogOpen: boolean;
};

type Action =
  | {
      type: 'PAGE_CHANGE';
      page: number;
    }
  | {
      type: 'SET_SEARCH_WORD';
      name?: string;
    }
  | {
      type: 'DELTE_GLYPH';
    }
  | {
      type: 'OPEN_DELETE_DIALOG';
      id: string;
    }
  | {
      type: 'CLOSE_DELETE_DIALOG';
    }
  | {
      type: 'SEARCH_WORD_CHANGE';
      params: GetGlyphsRequest;
    };

const initialState: Store = {
  searchQuery: {
    page: 1,
  },
  currentPage: 1,
  deleteId: '',
  deleteDialogOpen: false,
};

const reducer: React.Reducer<Store, Action> = (state, action): Store => {
  console.log(action);
  switch (action.type) {
    case 'PAGE_CHANGE':
      return { ...state, currentPage: action.page, searchQuery: { page: action.page } };
    case 'SET_SEARCH_WORD':
      return { ...state, currentPage: 1, searchQuery: { nameLike: action.name, page: 1 } };
    case 'DELTE_GLYPH':
      return { ...state, deleteDialogOpen: false, deleteId: '', searchQuery: { page: 1 } };
    case 'OPEN_DELETE_DIALOG':
      return { ...state, deleteDialogOpen: true, deleteId: action.id };
    case 'CLOSE_DELETE_DIALOG':
      return { ...state, deleteDialogOpen: false };
    case 'SEARCH_WORD_CHANGE':
      return { ...state, rowQuery: { ...action.params } };
  }
};

export const GlyphsContext = createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const GlyphsDispatchContext = createContext<React.Dispatch<Action>>(() => {});
export const GlyphsDataContext = createContext<ResponseValues<GlyphsResponse, ApiError>>({
  data: undefined,
  loading: false,
  error: undefined,
});
const PageContext = createContext(0);
const FormContext = createContext<GetGlyphsRequest | undefined>(undefined);

export const GlyphsProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const [response] = useFetch(apiRoutes.getGlyphs, store.searchQuery);

  return (
    <FormContext.Provider value={store.rowQuery}>
      <PageContext.Provider value={store.currentPage}>
        <ValidationProvider schema={GetGlyphsParams} state={store.rowQuery}>
          <GlyphsDataContext.Provider value={response}>
            <GlyphsContext.Provider value={store}>
              <GlyphsDispatchContext.Provider value={dispatch}>{children}</GlyphsDispatchContext.Provider>
            </GlyphsContext.Provider>
          </GlyphsDataContext.Provider>
        </ValidationProvider>
      </PageContext.Provider>
    </FormContext.Provider>
  );
};

export const useDispatch = () => {
  return useContext(GlyphsDispatchContext);
};

export const usePage = () => {
  return useContext(PageContext);
};

export const useForm = () => {
  return useContext(FormContext);
};
