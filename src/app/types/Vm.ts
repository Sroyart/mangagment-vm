export type MyVm = {
  id: string;
  name: string;
  type: string;
  location: string;
  hardwareProfile: HardwareProfile;
  storageProfile: StorageProfile;
  osProfile: OsProfile;
  networkProfile: NetworkProfile;
  provisioningState: string;
  vmId: string;
  timeCreated: string;
}

interface NetworkProfile {
  networkInterfaces: NetworkInterface[];
}

interface NetworkInterface {
  id: string;
  primary: boolean;
}

interface OsProfile {
  computerName: string;
  adminUsername: string;
  linuxConfiguration: LinuxConfiguration;
  secrets: any[];
  allowExtensionOperations: boolean;
  requireGuestProvisionSignal: boolean;
}

interface LinuxConfiguration {
  disablePasswordAuthentication: boolean;
  provisionVMAgent: boolean;
  patchSettings: PatchSettings;
  enableVMAgentPlatformUpdates: boolean;
}

interface PatchSettings {
  patchMode: string;
  assessmentMode: string;
}

interface StorageProfile {
  imageReference: ImageReference;
  osDisk: OsDisk;
  dataDisks: any[];
}

interface OsDisk {
  osType: string;
  name: string;
  vhd: Vhd;
  caching: string;
  createOption: string;
  diskSizeGB: number;
  deleteOption: string;
}

interface Vhd {
  uri: string;
}

interface ImageReference {
  publisher: string;
  offer: string;
  sku: string;
  version: string;
  exactVersion: string;
}

interface HardwareProfile {
  vmSize: string;
}