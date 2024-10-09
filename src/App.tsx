import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SelectBreed from "./routes/SelectBreed";
import ViewPhotos from "./routes/ViewPhotos";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./state/store";

// Define app routes
// In a bigger app this should be in its own file
const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectBreed />,
  },
  {
    path: "/view",
    element: <ViewPhotos />,
  },
]);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </ReduxProvider>
  );
}
