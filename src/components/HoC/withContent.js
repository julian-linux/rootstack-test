import React, { useEffect, useState, useContext } from "react";
import Context, { Provider } from "context";

import Loading from "components/loading";
import Error from "components/error";

const withContent = Component => {
  const { requestContent = null } = Component;

  const Wrapper = () => {
    const context = useContext(Context);
    const [data, setData] = useState(context.data);
    const isEmptyData = !Object.keys(data).length;

    const getData = async (url = requestContent) => {
      try {
        let randomData = await fetch(url);
        randomData = await randomData.json();
        setData(randomData.results);
      } catch (error) {
        setData({
          error
        });
      }
    };

    useEffect(() => {
      if (isEmptyData && requestContent) {
        getData();
      }
    }, [isEmptyData]);

    if (requestContent && isEmptyData) {
      return <Loading />;
    }

    if (requestContent && data.error) {
      return <Error />;
    }

    return (
      <Provider
        value={{
          data,
          getData
        }}
      >
        <Component />
      </Provider>
    );
  };
  return Wrapper;
};

export default withContent;
