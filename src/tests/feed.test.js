import { render } from "@testing-library/react";
import Feed from "../Components/Feed/Feed";

// Mock the posts data
jest.mock("../data/Posts.json", () => [
  {
    id: 1,
    user: "Test User",
    profilePic: "",
    date: "Just now",
    desc: "Test post",
  },
]);

describe("Feed", () => {
  const user = {
    name: "Test User",
    profilePic: "",
  };

  it("renders without crashing", () => {
    render(<Feed activeUser={user} />);
  });

  it("displays the correct user and post", () => {
    const { getByText } = render(<Feed activeUser={user} />);
    expect(getByText("Test User")).toBeInTheDocument();
    expect(getByText("Test post")).toBeInTheDocument();
  });
});
