const { default: MembersTable } = require("./members-table");

const MyPage = () => {
  const columns = [
    { key: "id", label: "ID", visible: true },
    { key: "member", label: "Member", visible: true },
    { key: "age", label: "Age", visible: true },
    { key: "education", label: "Education", visible: true },
  ];

  const actions = [
    {
      label: "Action 1",
      handler: () => console.log("Action 1"),
      color: "primary",
      hoverColor: "dark",
    },
    {
      label: "Action 2",
      handler: () => console.log("Action 2"),
      color: "secondary",
      hoverColor: "dark",
    },
  ];

  return (
    <MembersTable
      apiEndpoint="http://localhost:7777/members"
      columnsConfig={columns}
      actions={actions}
    />
  );
};
export default MyPage;
