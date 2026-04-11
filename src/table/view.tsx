import { Fynix, VNode, nixState } from "fynixui";
import {
  DataTable,
  PrimaryDataTable,
  SecondaryDataTable,
  SuccessDataTable,
  DangerDataTable,
  WarningDataTable,
  InfoDataTable,
  LightDataTable,
  DarkDataTable,
  OutlinePrimaryDataTable,
  OutlineSecondaryDataTable,
  OutlineSuccessDataTable,
  OutlineDangerDataTable,
  OutlineWarningDataTable,
  OutlineInfoDataTable,
  OutlineLightDataTable,
  OutlineDarkDataTable,
} from "fynixui/custom";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  status: "Active" | "Inactive";
}

type ModalType = "view" | "edit" | "delete" | null;

// ─── Column definitions ────────────────────────────────────────────────────────

const modalDemoCols = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "email", label: "Email" },
  {
    key: "status",
    label: "Status",
    render: (val: string) => (
      <span
        style={{
          display: "inline-block",
          padding: "2px 8px",
          borderRadius: "999px",
          fontSize: "11px",
          fontWeight: "500",
          background: val === "Active" ? "#dbeafe" : "#f3f4f6",
          color: val === "Active" ? "#1d4ed8" : "#6b7280",
        }}
      >
        {val}
      </span>
    ),
  },
];

const userCols = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
];
const taskCols = [
  { key: "task", label: "Task" },
  { key: "assignee", label: "Assignee" },
];
const productCols = [
  { key: "product", label: "Product" },
  { key: "stock", label: "Stock" },
];
const invoiceCols = [
  { key: "invoice", label: "Invoice" },
  { key: "due", label: "Due" },
];
const serverCols = [
  { key: "server", label: "Server" },
  { key: "cpu", label: "CPU" },
];
const reportCols = [
  { key: "report", label: "Report" },
  { key: "type", label: "Type" },
];
const orderCols = [
  { key: "order", label: "Order" },
  { key: "total", label: "Total" },
];
const instanceCols = [
  { key: "id", label: "Instance" },
  { key: "region", label: "Region" },
];
const itemCols = [
  { key: "item", label: "Item" },
  { key: "qty", label: "Qty" },
];
const alertCols = [
  { key: "alert", label: "Alert" },
  { key: "severity", label: "Severity" },
];
const flagCols = [
  { key: "flag", label: "Flag" },
  { key: "since", label: "Since" },
];
const logCols = [
  { key: "log", label: "Log" },
  { key: "level", label: "Level" },
];
const fileCols = [
  { key: "file", label: "File" },
  { key: "size", label: "Size" },
];
const pipelineCols = [
  { key: "pipeline", label: "Pipeline" },
  { key: "branch", label: "Branch" },
];

const headlessCols = [
  {
    key: "name",
    label: "Employee",
    style: { fontWeight: "500", color: "#1a1a2e" },
  },
  { key: "dept", label: "Department" },
  {
    key: "status",
    label: "Status",
    render: (val: string) => (
      <span
        style={{
          display: "inline-block",
          padding: "2px 8px",
          borderRadius: "999px",
          fontSize: "11px",
          fontWeight: "500",
          background: val === "Active" ? "#d1fae5" : "#fee2e2",
          color: val === "Active" ? "#065f46" : "#991b1b",
        }}
      >
        {val}
      </span>
    ),
  },
  {
    key: "score",
    label: "Score",
    style: { textAlign: "right", fontVariantNumeric: "tabular-nums" },
  },
];

// ─── Sample data ───────────────────────────────────────────────────────────────

const modalDemoData: User[] = [
  {
    id: 1,
    name: "Alice Reyes",
    role: "Engineer",
    email: "alice@fynix.dev",
    status: "Active",
  },
  {
    id: 2,
    name: "Ben Torres",
    role: "Designer",
    email: "ben@fynix.dev",
    status: "Active",
  },
  {
    id: 3,
    name: "Cara Wu",
    role: "Manager",
    email: "cara@fynix.dev",
    status: "Inactive",
  },
];

const userData = [
  { name: "Alice Reyes", role: "Engineer" },
  { name: "Ben Torres", role: "Designer" },
];
const taskData = [
  { task: "Design review", assignee: "Maya P." },
  { task: "API docs", assignee: "Jun L." },
];
const productData = [
  { product: "Widget Pro", stock: 142 },
  { product: "Bolt SDK", stock: "∞" },
];
const invoiceData = [
  { invoice: "INV-0081", due: "Overdue" },
  { invoice: "INV-0082", due: "Overdue" },
];
const serverData = [
  { server: "prod-01", cpu: "87%" },
  { server: "prod-02", cpu: "91%" },
];
const reportData = [
  { report: "Q1 summary", type: "Monthly" },
  { report: "User growth", type: "Weekly" },
];
const orderData = [
  { order: "#ORD-201", total: "$88.00" },
  { order: "#ORD-202", total: "$210.50" },
];
const instanceData = [
  { id: "i-0a1b2c3d", region: "us-east-1" },
  { id: "i-4e5f6a7b", region: "eu-west-2" },
];
const outlineUserData = [
  { name: "Cara Wu", role: "Manager" },
  { name: "Dan Kim", role: "Analyst" },
];
const outlineTaskData = [
  { task: "Onboarding", assignee: "Sara M." },
  { task: "QA review", assignee: "Leo B." },
];
const itemData = [
  { item: "Laptop stand", qty: 4 },
  { item: "USB-C hub", qty: 12 },
];
const alertData = [
  { alert: "Disk full", severity: "Critical" },
  { alert: "Memory leak", severity: "High" },
];
const flagData = [
  { flag: "Rate limit near", since: "2h ago" },
  { flag: "Cert expiring", since: "3d ago" },
];
const logData = [
  { log: "auth.login", level: "INFO" },
  { log: "db.connect", level: "DEBUG" },
];
const fileData = [
  { file: "report_q1.pdf", size: "1.2 MB" },
  { file: "data_export.csv", size: "340 KB" },
];
const pipelineData = [
  { pipeline: "build:prod", branch: "main" },
  { pipeline: "build:staging", branch: "develop" },
];
const headlessData = [
  {
    name: "Resty Gonzales",
    dept: "Engineering",
    status: "Active",
    score: "98",
  },
  { name: "Maya Santos", dept: "Design", status: "Inactive", score: "74" },
];

// ─── Shared action handler factory ────────────────────────────────────────────

function makeActions<T>(withDelete = false) {
  return {
    view: (row: T) => console.log("view", row),
    edit: (row: T) => console.log("edit", row),
    delete: withDelete
      ? (row: T) => console.log("delete", row)
      : (false as const),
  };
}

const headlessActions = {
  view: (row: any) => console.log("view", row),
  edit: (row: any) => console.log("edit", row),
  delete: (row: any) => console.log("delete", row),
  extra: [
    {
      label: "Archive",
      handler: (row: any) => console.log("archive", row),
      style: {
        padding: "3px 9px",
        fontSize: "12px",
        border: "1px solid #7c3aed",
        borderRadius: "4px",
        color: "#7c3aed",
        background: "transparent",
        cursor: "pointer",
      },
    },
  ],
};

// ─── Modal components ─────────────────────────────────────────────────────────

// Shared field row used inside view/edit panels
function Field({
  label,
  children,
}: {
  label: string;
  children: VNode | string;
}): VNode {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginBottom: "14px",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontWeight: "500",
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function ViewModal({
  row,
  onClose,
}: {
  row: User;
  onClose: () => void;
}): VNode {
  return (
    <div>
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: "500",
              color: "#1d4ed8",
            }}
          >
            {row.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p style={{ margin: "0", fontWeight: "500", fontSize: "15px" }}>
              {row.name}
            </p>
            <p style={{ margin: "0", fontSize: "12px", color: "#6b7280" }}>
              {row.role}
            </p>
          </div>
        </div>
        <button
          r-click={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            color: "#9ca3af",
            cursor: "pointer",
            lineHeight: "1",
          }}
        >
          ✕
        </button>
      </div>

      <Field label="Email">
        <span style={{ fontSize: "14px", color: "#0d6efd" }}>{row.email}</span>
      </Field>
      <Field label="Role">
        <span style={{ fontSize: "14px" }}>{row.role}</span>
      </Field>
      <Field label="Status">
        <span
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: "500",
            width: "fit-content",
            background: row.status === "Active" ? "#dbeafe" : "#f3f4f6",
            color: row.status === "Active" ? "#1d4ed8" : "#6b7280",
          }}
        >
          {row.status}
        </span>
      </Field>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "8px",
        }}
      >
        <button
          r-click={onClose}
          style={{
            padding: "7px 18px",
            borderRadius: "6px",
            fontSize: "13px",
            border: "1px solid #d1d5db",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function EditModal({
  row,
  onClose,
}: {
  row: User;
  onClose: () => void;
}): VNode {
  const name = nixState(row.name);
  const role = nixState(row.role);
  const email = nixState(row.email);

  function handleSave() {
    console.log("saved", { ...row, name, role, email });
    onClose();
  }

  const inputStyle = {
    width: "100%",
    padding: "7px 10px",
    fontSize: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div>
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <p style={{ margin: "0", fontWeight: "500", fontSize: "15px" }}>
          Edit user
        </p>
        <button
          r-click={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            color: "#9ca3af",
            cursor: "pointer",
            lineHeight: "1",
          }}
        >
          ✕
        </button>
      </div>

      <Field label="Name">
        <input
          type="text"
          value={name.value}
          r-input={(e: InputEvent) => (e.target as HTMLInputElement).value}
          style={inputStyle}
        />
      </Field>
      <Field label="Role">
        <input
          type="text"
          value={role.value}
          r-input={(e: InputEvent) => (e.target as HTMLInputElement).value}
          style={inputStyle}
        />
      </Field>
      <Field label="Email">
        <input
          type="email"
          value={email.value}
          r-input={(e: InputEvent) => (e.target as HTMLInputElement).value}
          style={inputStyle}
        />
      </Field>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        <button
          r-click={onClose}
          style={{
            padding: "7px 18px",
            borderRadius: "6px",
            fontSize: "13px",
            border: "1px solid #d1d5db",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          r-click={handleSave}
          style={{
            padding: "7px 18px",
            borderRadius: "6px",
            fontSize: "13px",
            border: "none",
            background: "#0d6efd",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

function DeleteModal({
  row,
  onClose,
}: {
  row: User;
  onClose: () => void;
}): VNode {
  function handleDelete() {
    console.log("deleted", row);
    onClose();
  }

  return (
    <div>
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <p style={{ margin: "0", fontWeight: "500", fontSize: "15px" }}>
          Delete user
        </p>
        <button
          r-click={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            color: "#9ca3af",
            cursor: "pointer",
            lineHeight: "1",
          }}
        >
          ✕
        </button>
      </div>

      {/* warning icon + copy */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "8px",
          padding: "14px",
          marginBottom: "20px",
        }}
      >
        <span style={{ fontSize: "18px", flexShrink: "0", marginTop: "1px" }}>
          ⚠️
        </span>
        <div>
          <p
            style={{
              margin: "0 0 4px",
              fontWeight: "500",
              fontSize: "13px",
              color: "#991b1b",
            }}
          >
            This action cannot be undone
          </p>
          <p style={{ margin: "0", fontSize: "13px", color: "#b91c1c" }}>
            You are about to permanently delete <strong>{row.name}</strong>. All
            associated data will be removed.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <button
          r-click={onClose}
          style={{
            padding: "7px 18px",
            borderRadius: "6px",
            fontSize: "13px",
            border: "1px solid #d1d5db",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          r-click={handleDelete}
          style={{
            padding: "7px 18px",
            borderRadius: "6px",
            fontSize: "13px",
            border: "none",
            background: "#dc3545",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Yes, delete
        </button>
      </div>
    </div>
  );
}

// Backdrop + panel wrapper
function Modal({
  type,
  row,
  onClose,
}: {
  type: ModalType;
  row: User | null;
  onClose: () => void;
}): VNode | null {
  if (!type || !row) return null;

  return (
    // backdrop — click outside to close
    <div
      r-click={onClose}
      style={{
        position: "fixed",
        inset: "0",
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1000",
      }}
    >
      {/* panel — stop propagation so clicking inside doesn't close */}
      <div
        r-click={(e: MouseEvent) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          width: "100%",
          maxWidth: "420px",
          boxSizing: "border-box",
        }}
      >
        {type === "view" && <ViewModal row={row} onClose={onClose} />}
        {type === "edit" && <EditModal row={row} onClose={onClose} />}
        {type === "delete" && <DeleteModal row={row} onClose={onClose} />}
      </div>
    </div>
  );
}

// ─── Layout sub-components ─────────────────────────────────────────────────────

interface SectionProps {
  label: string;
  children: VNode;
}

function Section({ label, children }: SectionProps): VNode {
  return (
    <div>
      <p
        style={{
          fontSize: "11px",
          fontWeight: "500",
          color: "#888",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

interface GroupProps {
  title: string;
  description?: string;
  children: VNode | VNode[];
  columns?: number;
}

function Group({
  title,
  description,
  children,
  columns = 2,
}: GroupProps): VNode {
  return (
    <div style={{ marginBottom: "32px" }}>
      <div
        style={{
          marginBottom: "12px",
          paddingBottom: "6px",
          borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        }}
      >
        <p style={{ fontSize: "13px", fontWeight: "500", margin: "0 0 2px" }}>
          {title}
        </p>
        {description && (
          <p style={{ fontSize: "12px", color: "#888", margin: "0" }}>
            {description}
          </p>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "14px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── View ──────────────────────────────────────────────────────────────────────

export default function TableView(): VNode {
  // Modal state — shared across view / edit / delete
  const modalType = nixState<ModalType>(null);
  const selectedRow = nixState<User | null>(null);

  function openModal(type: ModalType, row: User) {
    modalType.value = type;
    selectedRow.value = row;
  }

  function closeModal() {
    modalType.value = null;
    selectedRow.value = null;
  }

  // Actions wired to open the modal
  const modalActions = {
    view: (row: User) => openModal("view", row),
    edit: (row: User) => openModal("edit", row),
    delete: (row: User) => openModal("delete", row),
  };

  return (
    <div style={{ padding: "1rem 0" }}>
      {/* ── Modal (rendered at top level so it overlays everything) ───────── */}
      <Modal
        type={modalType.value}
        row={selectedRow.value}
        onClose={closeModal}
      />

      {/* ── Primary with modal demo ───────────────────────────────────────── */}

      <Group
        title="Primary — with modal actions"
        description="Click View, Edit, or Delete on any row to open the corresponding modal."
        columns={1}
      >
        <Section label="Primary (modal demo)">
          <PrimaryDataTable
            columns={modalDemoCols}
            data={modalDemoData}
            actions={modalActions}
            hoverable
            bordered
          />
        </Section>
      </Group>

      {/* ── Headless ──────────────────────────────────────────────────────── */}

      {/* ── Filled variants ───────────────────────────────────────────────── */}

      <Group title="Filled variants">
        <Section label="Primary">
          <PrimaryDataTable
            columns={userCols}
            data={userData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Secondary">
          <SecondaryDataTable
            columns={taskCols}
            data={taskData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Success">
          <SuccessDataTable
            columns={productCols}
            data={productData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Danger">
          <DangerDataTable
            columns={invoiceCols}
            data={invoiceData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Warning">
          <WarningDataTable
            columns={serverCols}
            data={serverData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Info">
          <InfoDataTable
            columns={reportCols}
            data={reportData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Light">
          <LightDataTable
            columns={orderCols}
            data={orderData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Dark">
          <DarkDataTable
            columns={instanceCols}
            data={instanceData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
      </Group>

      {/* ── Outline variants ──────────────────────────────────────────────── */}

      <Group title="Outline variants">
        <Section label="Outline primary">
          <OutlinePrimaryDataTable
            columns={userCols}
            data={outlineUserData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Outline secondary">
          <OutlineSecondaryDataTable
            columns={taskCols}
            data={outlineTaskData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Outline success">
          <OutlineSuccessDataTable
            columns={itemCols}
            data={itemData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Outline danger">
          <OutlineDangerDataTable
            columns={alertCols}
            data={alertData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Outline warning">
          <OutlineWarningDataTable
            columns={flagCols}
            data={flagData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Outline info">
          <OutlineInfoDataTable
            columns={logCols}
            data={logData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Outline light">
          <OutlineLightDataTable
            columns={fileCols}
            data={fileData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
        <Section label="Outline dark">
          <OutlineDarkDataTable
            columns={pipelineCols}
            data={pipelineData}
            actions={makeActions(true)}
            hoverable
            bordered
          />
        </Section>
      </Group>
    </div>
  );
}
