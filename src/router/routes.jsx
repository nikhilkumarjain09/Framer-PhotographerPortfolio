import { Navigate, createBrowserRouter } from "react-router-dom";
import { TopScroll } from "../components/util/TopScroll";
import App from "../App";
import Home from "../pages/Home";
import Stagger from "../pages/Stagger";
import Basic from "../pages/Basic";
import Scroll from "../pages/scroll/Scroll";
import PageScroll from "../pages/scroll/PageScroll";
import HorizontalScroll from "../pages/scroll/HorizontalScroll";
import EnlargeScroll from "../pages/scroll/EnlargeScroll";
import Hamburger from "../pages/Hamburger";
import Buttons from "../pages/Buttons";
import Text from "../pages/text/Text";
import Gradients from "../pages/Gradients";
import GridHover from "../pages/GridHover";
import InViewScroll from "../pages/scroll/InViewScroll";
import Marquee from "../pages/scroll/Marquee";
import DropMenu from "../components/navigation/DropMenu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <TopScroll />
        <App />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dropmenu",
        element: <DropMenu />,
      },
      {
        path: "/stagger",
        element: <Stagger />,
      },
      {
        path: "/basic",
        element: <Basic />,
      },
      {
        path: "/text",
        element: <Text />,
      },
      {
        path: "/hamburger",
        element: <Hamburger />,
      },
      {
        path: "/buttons",
        element: <Buttons />,
      },
      {
        path: "/gradient",
        element: <Gradients />,
      },
      {
        path: "/gridhover",
        element: <GridHover />,
      },
      {
        path: "/scroll",
        element: <Scroll />,
        children: [
          {
            path: "/scroll",
            element: (
              <p className="font-thin">Click on any of the Tabs above</p>
            ),
          },
          {
            path: "/scroll/horizontal",
            element: <HorizontalScroll />,
          },
          {
            path: "/scroll/page",
            element: <PageScroll />,
          },
          {
            path: "/scroll/enlarge",
            element: <EnlargeScroll />,
          },
          {
            path: "/scroll/inview",
            element: <InViewScroll />,
          },
          {
            path: "/scroll/marquee",
            element: <Marquee />,
          },
        ],
      },
      {
        path: "/*",
        element: <Navigate to={`.`} />,
      },
    ],
  },
]);
