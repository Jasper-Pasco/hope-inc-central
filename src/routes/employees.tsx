import { createFileRoute } from "@tanstack/react-router";
import { Users, Plus, Pencil, Trash2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";

// Mock user role - in real app this comes from useRights() hook from M4
const MOCK_ROLE = "ADMIN"; // Change to "USER" to test USER view

const employees = [
  {
    empno: "EMP001",
    lastname: "Chen",
    firstname: "Maya",
    gender: "F",
    hiredate: "2021-03-15",
    sepdate: "—",
    currentJob: "Sr. Designer",
    stamp: "2024-01-10 09:00:00",
    status: "ACTIVE",
  },
  {
    empno: "EMP002",
    lastname: "Reed",
    firstname: "Jordan",
    gender: "M",
    hiredate: "2020-07-01",
    sepdate: "—",
    currentJob: "Backend Engineer",
    stamp: "2024-02-14 11:30:00",
    status: "ACTIVE",
  },
  {
    empno: "EMP003",
    lastname: "Patel",
    firstname: "Priya",
    gender: "F",
    hiredate: "2019-11-20",
    sepdate: "—",
    currentJob: "HR Specialist",
    stamp: "2024-03-05 08:45:00",
    status: "ACTIVE",
  },
  {
    empno: "EMP004",
    lastname: "O'Connor",
    firstname: "Liam",
    gender: "M",
    hiredate: "2022-01-10",
    sepdate: "2023-12-31",
    currentJob: "Account Executive",
    stamp: "2024-01-02 10:15:00",
    status: "INACTIVE",
  },
  {
    empno: "EMP005",
    lastname: "Kim",
    firstname: "Sara",
    gender: "F",
    hiredate: "2021-06-01",
    sepdate: "—",
    currentJob: "Content Lead",
    stamp: "2024-04-20 14:00:00",
    status: "ACTIVE",
  },
  {
    empno: "EMP006",
    lastname: "Santos",
    firstname: "Marco",
    gender: "M",
    hiredate: "2018-09-15",
    sepdate: "2024-01-15",
    currentJob: "Sales Manager",
    stamp: "2024-01-16 09:00:00",
    status: "INACTIVE",
  },
];

export const Route = createFileRoute("/employees")({
  head: () => ({ meta: [{ title: "Employees – Hope, Inc. HR" }] }),
  component: EmployeesPage,
});

function EmployeesPage() {
  const isUser = MOCK_ROLE === "USER";
  const isAdminOrSuper = MOCK_ROLE === "ADMIN" || MOCK_ROLE === "SUPERADMIN";

  // USER cannot see INACTIVE rows
  const visibleEmployees = isUser
    ? employees.filter((e) => e.status === "ACTIVE")
    : employees;

  const [selectedEmp, setSelectedEmp] = useState<(typeof employees)[0] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<(typeof employees)[0] | null>(null);

  return (
    <AppShell title="Employees">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Employees</h2>
            <p className="text-sm text-muted-foreground">
              Directory of all team members across Hope, Inc.
            </p>
          </div>
        </div>

        {/* Add button — gated: EMP_ADD (ADMIN/SUPERADMIN only) */}
        {isAdminOrSuper && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant hover:opacity-90 transition"
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Emp No.</th>
                <th className="px-5 py-3">Last Name</th>
                <th className="px-5 py-3">First Name</th>
                <th className="px-5 py-3">Gender</th>
                <th className="px-5 py-3">Hire Date</th>
                <th className="px-5 py-3">Sep Date</th>
                <th className="px-5 py-3">Current Job</th>
                <th className="px-5 py-3">Status</th>
                {/* Stamp column — hidden for USER */}
                {!isUser && <th className="px-5 py-3">Stamp</th>}
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleEmployees.map((emp) => (
                <tr
                  key={emp.empno}
                  className={`hover:bg-secondary/50 transition ${
                    emp.status === "INACTIVE" ? "opacity-50" : ""
                  }`}
                >
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{emp.empno}</td>
                  <td className="px-5 py-3 font-medium">{emp.lastname}</td>
                  <td className="px-5 py-3">{emp.firstname}</td>
                  <td className="px-5 py-3">{emp.gender}</td>
                  <td className="px-5 py-3">{emp.hiredate}</td>
                  <td className="px-5 py-3">{emp.sepdate}</td>
                  <td className="px-5 py-3">{emp.currentJob}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        emp.status === "ACTIVE"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  {/* Stamp — hidden for USER */}
                  {!isUser && (
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                      {emp.stamp}
                    </td>
                  )}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {/* Edit button — gated: EMP_EDIT (ADMIN/SUPERADMIN) */}
                      {isAdminOrSuper && (
                        <button
                          onClick={() => setSelectedEmp(emp)}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium hover:bg-secondary transition"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </button>
                      )}
                      {/* Delete button — gated: EMP_DEL (SUPERADMIN only) */}
                      {MOCK_ROLE === "SUPERADMIN" && emp.status === "ACTIVE" && (
                        <button
                          onClick={() => setShowDeleteConfirm(emp)}
                          className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal (mockup) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-elegant">
            <h3 className="mb-4 font-display text-lg font-bold">Add Employee</h3>
            <div className="space-y-3">
              {["Last Name", "First Name", "Gender", "Hire Date"].map((field) => (
                <div key={field}>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    {field}
                  </label>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`Enter ${field.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal (mockup) */}
      {selectedEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-elegant">
            <h3 className="mb-4 font-display text-lg font-bold">
              Edit Employee — {selectedEmp.firstname} {selectedEmp.lastname}
            </h3>
            <div className="space-y-3">
              {[
                { label: "Last Name", value: selectedEmp.lastname },
                { label: "First Name", value: selectedEmp.firstname },
                { label: "Gender", value: selectedEmp.gender },
                { label: "Hire Date", value: selectedEmp.hiredate },
              ].map((field) => (
                <div key={field.label}>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    {field.label}
                  </label>
                  <input
                    defaultValue={field.value}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setSelectedEmp(null)}
                className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setSelectedEmp(null)}
                className="rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (mockup) */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-elegant">
            <h3 className="mb-2 font-display text-lg font-bold text-red-600">Delete Employee</h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Are you sure you want to deactivate{" "}
              <span className="font-medium text-foreground">
                {showDeleteConfirm.firstname} {showDeleteConfirm.lastname}
              </span>
              ? This will set their status to INACTIVE.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}