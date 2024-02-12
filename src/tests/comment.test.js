import { render } from '@testing-library/react';
import Comment from '../Components/Comment/Comment';

describe('Comment', () => {
  const commentMock = {
    postId: 1,
    commentId: 1,
    desc: 'Test comment',
    user: 'Test User',
    profilePicture: '',
    date: 'Just now',
  };

  it('renders without crashing', () => {
    render(<Comment {...commentMock} />);
  });

  it('displays the correct user and comment', () => {
    const { getByText } = render(<Comment {...commentMock} />);
    expect(getByText('Test User')).toBeInTheDocument();
    expect(getByText('Test comment')).toBeInTheDocument();
  });
});
