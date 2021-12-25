import React, { memo, useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { observer } from "mobx-react";
import advsStore from "stores/advs";
import RequestStatus from "core/types/requestStatus";
import { AdvCard } from "components/moleculs";
import { Advertisement } from "core/models";
import { useRouter } from "next/dist/client/router";

const containerStyle = {
  width: "100%",
  minHeight: "450px",
};

const defaultCenter = {
  lat: 59.9716662,
  lng: 30.3237567,
};

const AdvsMap: React.FC = () => {
  const [selected, setSelected] = useState<Advertisement | null>(null);

  const router = useRouter();

  const center = useMemo(
    () => ({
      lat: parseFloat(`${router.query.lat}`) || defaultCenter.lat,
      lng: parseFloat(`${router.query.lng}`) || defaultCenter.lng,
    }),
    [router],
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCfrpLTS2S563wrzq2LhHL6aN0DIUoBc5A",
  });
  useEffect(() => {
    advsStore.loadAll();
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <>
          {advsStore.list.map((adv) => (
            <Marker
              key={adv._id}
              position={{ lat: adv.house.address.lat, lng: adv.house.address.lng }}
              onClick={() => setSelected(adv)}
            />
          ))}
        </>
      </GoogleMap>
      {selected && <AdvCard key={selected._id} data={selected} />}
    </>
  ) : (
    <></>
  );
};

export default observer(AdvsMap);
