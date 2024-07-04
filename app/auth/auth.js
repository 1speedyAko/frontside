// 'use client'

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const router = useRouter();

//     useEffect(() => {
//       const token = localStorage.getItem('access');
//       if (!token) {
//         router.push('/login');
//       }
//     }, []);

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;
