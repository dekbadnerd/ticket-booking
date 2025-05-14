import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { AuthenticationProvider } from '@/context/AuthContext';

export default function Root() {
  return (
    <>
      <StatusBar style='dark'/>
      <AuthenticationProvider>
      {/*render the current page based on the URL path */}
      <Slot />
      </AuthenticationProvider>
    </>
  )
}