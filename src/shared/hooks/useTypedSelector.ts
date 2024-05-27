import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../app/store/rootReducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
