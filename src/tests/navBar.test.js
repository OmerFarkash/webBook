import { getByAltText, render } from "@testing-library/react";
import NavBar from "../Components/NavBar/NavBar";

describe("NavBar", () => {
  const user = {
    name: "Test User",
    profilePic: "",
  };

  it("renders without crashing", () => {
    render(<NavBar user={user} />);
  });

  it("displays the correct user", () => {
    const { getByText } = render(<NavBar user={user} />);
    expect(getByText("Test User")).toBeInTheDocument();
  });
});
