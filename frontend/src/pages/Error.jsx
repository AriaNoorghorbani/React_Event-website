import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

export default function Error() {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong";

  if (error.status === 200) {
    const parsedData = JSON.parse(error.data);
    if (parsedData && parsedData.message) {
      message = parsedData.message;
    }
  }

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
