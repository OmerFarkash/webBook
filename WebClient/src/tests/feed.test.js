import { render } from "@testing-library/react";
import Feed from "../Components/Feed/Feed";

// Mock the posts data
jest.mock("../data/Posts.json", () => [
  {
    id: 1,
    name: "john doe",
    profilePic: "",
    date: "Just now",
    desc: "Test post",
  },
]);

describe("Feed", () => {
  const user = {
    "id": "1",
    "name": "john doe",
    "username": "john",
    "email": "john@gmail.com",
    "password": "John1234!",
    "profilePic": ""
  };

  it("renders without crashing", () => {
    render(<Feed activeUser={user} />);
  });

  it("displays the correct user and post", () => {
    const { getByText } = render(<Feed activeUser={user} />);
    expect(getByText("john doe")).toBeInTheDocument();
    expect(getByText("Test post")).toBeInTheDocument();
  });
});
