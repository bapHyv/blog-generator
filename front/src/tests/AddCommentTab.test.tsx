import { render, screen } from '@testing-library/react';
// import AddCommentTab from '../components/AddCommentTab';
import { MockedProvider } from '@apollo/client/testing';
// import user from '@testing-library/user-event';
import Home from '../pages/Home';

test('it should have a title', () => {
  render(
    <MockedProvider>
      <Home />
    </MockedProvider>,
  );

  const title = screen.getByRole('heading');

  expect(title).toBeInTheDocument();
});

// test('It should have a form, a textarea and an input type submit', () => {
//   const mocks: any[] = [];
//   render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <AddCommentTab id={2} type="article" />
//     </MockedProvider>,
//   );

//   const form = screen.getByTestId('form');
//   const textarea = screen.getByRole('textbox');
//   const submitButton = screen.getByText(/add comment/i);

//   expect(form).toBeInTheDocument();
//   expect(textarea).toBeInTheDocument();
//   expect(submitButton).toBeInTheDocument();
// });

// test('The button should be disabled if there is no comment in the text area', () => {
//   const mocks: any[] = [];
//   render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <AddCommentTab id={2} type="article" />
//     </MockedProvider>,
//   );

//   const submitButton = screen.getByText(/add comment/i);

//   expect(submitButton).toBeDisabled();
// });

// test('the writer shoud be able to write a comment in the textarea', () => {
//   const mocks: any[] = [];
//   render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <AddCommentTab id={2} type="article" />
//     </MockedProvider>,
//   );

//   const textarea = screen.getByRole('textbox');

//   user.click(textarea);

//   user.keyboard('Hello world');
// });

// test('The writer should be able to add a comment to the article', async () => {
//   render(
//     <MockedProvider addTypename={false}>
//       <AddCommentTab id={2} type="article" />
//     </MockedProvider>,
//   );

//   const textarea = screen.getByRole('textbox');

//   user.click(textarea);

//   user.keyboard('Hello world');

//   const submitButton = screen.getByText(/add comment/i);

//   user.click(submitButton);

//   const alert = await screen.findByText(
//     /Your comment has been added successfully, it will be visible when the writer valids it/i,
//   );

//   expect(alert).toBeInTheDocument();
// });
