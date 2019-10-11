import React, { useEffect, useState, useContext } from "react";
import Context, { Provider } from "context";

import Loading from "components/loading";

const withContent = Component => {
  const { requestContent } = Component;

  const Wrapper = () => {
    const context = useContext(Context);
    const [data, setData] = useState(context.data);
    const isEmptyData = !Object.keys(data).length;
    useEffect(() => {
      const getData = async () => {
        try {
          let randomData = await fetch(requestContent);
          randomData = await randomData.json();
          setData(randomData.results);
        } catch (error) {
          setData({
            error
          });
        }
      };
      if (isEmptyData) {
        getData();
      }
    }, [isEmptyData]);

    if (isEmptyData) {
      return <Loading />;
    }

    return (
      <Provider
        value={{
          data
        }}
      >
        <Component />
      </Provider>
    );
  };
  return Wrapper;
};

export default withContent;
