import { AdvCard } from "components/moleculs";
import { Advertisement } from "core/models";
import { observer } from "mobx-react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useMemo, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import advsStore from "stores/advs";

const defaultCenter = [59.9716662, 30.3237567];
const AdvsMap = (): JSX.Element => {
  const [selected, setSelected] = useState<Advertisement | null>(null);

  const router = useRouter();

  const center = useMemo(
    () => [+`${router.query.lat}` || defaultCenter[0], +`${router.query.lng}` || defaultCenter[1]],
    [router],
  );

  useEffect(() => {
    advsStore.loadAll();
  }, []);

  return (
    <>
      <YMaps>
        <Map
          defaultState={{
            center,
            zoom: 15,
            controls: ["zoomControl", "fullscreenControl"],
          }}
          modules={["control.ZoomControl", "control.FullscreenControl"]}
          width="100%"
          height={400}
        >
          {advsStore.list.map((adv) => (
            <Placemark
              key={adv._id}
              defaultGeometry={[adv.house.address.lat, adv.house.address.lng]}
              onClick={() => setSelected(adv)}
            />
          ))}
        </Map>
      </YMaps>
      {selected && <AdvCard key={selected._id} data={selected} />}
    </>
  );
};

export default observer(AdvsMap);
