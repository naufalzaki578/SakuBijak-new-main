import DashboardLayout from "../layouts/DashboardLayout";
import { useSession } from "../hooks/useAuth";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <div className="bg-white dark:bg-surface-dark rounded-xl p-6">
          <p><strong>Name:</strong> {session?.user?.name}</p>
          <p><strong>Email:</strong> {session?.user?.email}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}