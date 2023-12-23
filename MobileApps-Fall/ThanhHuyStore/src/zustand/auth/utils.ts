import { batch } from "react-redux";

// export const authBatch = (data: ILogin) =>
//   batch(() => {
//     if (data?.viewer) syncMe(data.viewer);
//     // set people to redux
//     if (data?.people.length) {
//       syncUser(data.people);
//       setUserQueries({
//         allIds: data.people.map((item) => item?.id),
//         allUsernames: data.people.map((item) => item.username),
//       });
//     }
//     if (data.system) {
//       Core.systemPath = data.system.path;
//       syncSystem(data.system);
//     }
//     if (data.user_groups) {
//       syncUserGroup(data.user_groups);
//       setUserGroupQueries({
//         allIds: data.user_groups.map((item) => item?.id),
//         teams: data.user_groups
//           .filter((item) => item.metatype !== "user")
//           .map((item) => item?.id),
//       });
//     }
//   });
