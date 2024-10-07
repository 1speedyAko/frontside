import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("access") : null;

    useEffect(() => {
      if (!isDevelopment && !accessToken) {
        // Redirect to login if in production and no token
        router.push("/login");
      }
    }, [router, accessToken, isDevelopment]);

    // If in development, skip login checks and render component
    if (isDevelopment) {
      return <WrappedComponent {...props} />;
    }

    // If no token and not in development, show nothing (or loader)
    if (!accessToken) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
