import DashboardLayout from "../layouts/DashboardLayout";

export default function Billing() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Billing</h1>

        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 mt-5">
          <p>No billing information available.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}