'use client';

import MainCard from '../components/maincard';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useParams } from 'next/navigation';

export default function Home() {
  const uid = useParams()?.uid as string;

  return (
    <Provider store={store}>
      <MainCard uid={uid} />
    </Provider>
  );
}
