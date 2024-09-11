import { getToken } from 'next-auth/jwt';
import SubscriptionPlans from '../components/SubscriptionPlans';

export async function getServerSideProps(context) {
  const token = await getToken(context.req);
  
  if (!token) {
    return { props: { error: 'Unauthorized' } };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/plans/`, {
    headers: {
      'Authorization': `Bearer ${token.accessToken}`, // Adjust according to how your token is structured
    },
    cache: 'no-store',
  });

  const plans = await res.json();

  return {
    props: { plans },
  };
}

export default function SubscriptionPage({ plans }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-ebony">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <SubscriptionPlans plans={plans} />
      </div>
    </div>
  );
}
