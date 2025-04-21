import { NhostClient } from 'nhost'

const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN || 'rocnlydkxftpjgmmirwn',
  region: process.env.NHOST_REGION || 'eu-central-1'
})

export { nhost }
