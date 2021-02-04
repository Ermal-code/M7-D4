export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_JOB_TO_FAVORITE":
      return [...state, action.payload];

    case "REMOVE_JOB_FROM_FAVORITE":
      return [...state.filter((job) => job.id !== action.payload.id)];

    default:
      return state;
  }
}
