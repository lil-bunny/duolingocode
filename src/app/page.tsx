"use client"
import MainCard from "./components/maincard";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <MainCard></MainCard>
    </Provider>
  );
}
