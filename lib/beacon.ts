import { DAppClient, BeaconEvent } from "@airgap/beacon-sdk"

export { BeaconEvent }
export const beaconClient = new DAppClient({ name: "interlace.community" })
