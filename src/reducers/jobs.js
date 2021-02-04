export default function (state = {}, action) {
  switch (action.type) {
    case "TO_DETAILS":
      return {
        ...state,
        job: { ...action.payload },
      };
    case "GET_JOBS": {
      return {
        ...state,
        arrJobs: [...action.payload],
      };
    }
    default:
      return state;
  }
}
