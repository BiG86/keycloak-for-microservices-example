export interface IGateway {
  gateway?: string;
  id?: string;
  memoryTotalUsed?: number;
  memoryTotalMax?: number;
  uptime?: string;
  cpuUsage?: string;
  systemUsage?: string;
  systemCount?: number;
  average?: number;
  fileMax?: number;
  fileOpen?: number;
  maxDataSize?: number;
  liveDataSize?: number;
  gcPromoted?: number;
  gcAllocated?: number;
  clLoaded?: number;
  clUnloaded?: number;
  bufferTotal?: number;
  bufferCount?: number;
  connectActive?: number;
  connectMin?: number;
  connectMax?: number;
  connectIdle?: number;
  connectUsage?: any;
  connectAcquire?: any;
  connectCreation?: any;
  connection?: number;
  bufferMemoryUsed?: number;
  threads?: any;
  threadTotal?: number;
  httpRequest?: any;
  starTime?: string;
}

export class GatewayModel implements IGateway {
  [x: string]: any;

  constructor(
    public gateway?: string,
    public id?: string,
    public memoryTotalUsed?: number,
    public memoryTotalMax?: number,
    public uptime?: string,
    public cpuUsage?: string,
    public systemUsage?: string,
    public systemCount?: number,
    public average?: number,
    public fileMax?: number,
    public fileOpen?: number,
    public maxDataSize?: number,
    public liveDataSize?: number,
    public gcPromoted?: number,
    public gcAllocated?: number,
    public clLoaded?: number,
    public clUnloaded?: number,
    public bufferTotal?: number,
    public bufferCount?: number,
    public connectActive?: number,
    public connectMin?: number,
    public connectMax?: number,
    public connectIdle?: number,
    public connectUsage?: any,
    public connectAcquire?: any,
    public connectCreation?: any,
    public connection?: number,
    public bufferMemoryUsed?: number,
    public threads?: any,
    public threadTotal?: number,
    public httpRequest?: any,
    public starTime?: string
  ) {
    this.gateway = gateway ? gateway : null;
    this.id = id ? id : null;
    this.memoryTotalUsed = memoryTotalUsed ? memoryTotalUsed : null;
    this.memoryTotalMax = memoryTotalMax ? memoryTotalMax : null;
    this.uptime = uptime ? uptime : null;
    this.cpuUsage = cpuUsage ? cpuUsage : null;
    this.systemUsage = systemUsage ? systemUsage : null;
    this.systemCount = systemCount ? systemCount : null;
    this.average = average ? average : null;
    this.fileMax = fileMax ? fileMax : null;
    this.fileOpen = fileOpen ? fileOpen : null;
    this.maxDataSize = maxDataSize ? maxDataSize : null;
    this.liveDataSize = liveDataSize ? liveDataSize : null;
    this.gcPromoted = gcPromoted ? gcPromoted : null;
    this.gcAllocated = gcAllocated ? gcAllocated : null;
    this.clLoaded = clLoaded ? clLoaded : null;
    this.clUnloaded = clUnloaded ? clUnloaded : null;
    this.bufferTotal = bufferTotal ? bufferTotal : null;
    this.bufferCount = bufferCount ? bufferCount : null;
    this.connectActive = connectActive ? connectActive : null;
    this.connectMin = connectMin ? connectMin : null;
    this.connectMax = connectMax ? connectMax : null;
    this.connectIdle = connectIdle ? connectIdle : null;
    this.connectUsage = connectUsage ? connectUsage : null;
    this.connectAcquire = connectAcquire ? connectAcquire : null;
    this.connectCreation = connectCreation ? connectCreation : null;
    this.connection = connection ? connection : null;
    this.bufferMemoryUsed = bufferMemoryUsed ? bufferMemoryUsed : null;
    this.threads = threads ? threads : null;
    this.threadTotal = threadTotal ? threadTotal : null;
    this.httpRequest = httpRequest ? httpRequest : null;
    this.starTime = starTime ? starTime : null;
  }
}
