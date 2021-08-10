'use strict'

const Job = use('Job')

const Mail = use('Mail')

class SendEmail extends Job {
  get queue () {
    return 'low'
  }

  constructor (emailAddress, emailFrom, emailSubject, emailBody, payloads) {
    super(arguments)

    this.timeOut = 100 // seconds
    this.retryCount = 0
    this.retryUntil = 200 // seconds
    this.delayUntil = 0 // optional, omit this line if not required
  }

  async handle (link, done) {
    console.log(`Job [${this.constructor.name}] - handler called: status=running; id=${this.id} `)

    await link.reportProgress(10)

    const _data = link.data // arguments passed into the constructor
    let error = null
    let result = null

    try {
      result = await Mail.send(_data.emailBody, _data.payloads, (message) => {
        message.to(_data.emailAddress)
        message.from(_data.emailFrom)
        message.subject(_data.emailSubject)
      })
      await link.reportProgress(50)
    } catch (err) {
      error = err
      result = undefined
      await link.reportProgress(50)
    } finally {
      await link.reportProgress(100)
    }

    return new Promise((resolve, reject) => {
      error === null ? resolve(result) : reject(error)
    })
  }

  progress (progress) {
    console.log(`Job [${this.constructor.name}] - progress:${progress}%: status=running; id=${this.id} `)
  }

  failed (error) {
    console.log(`Job [${this.constructor.name}] - status:failed; id=${this.id} `, error.message)

    this.detach() // remove the job from the queue (when the job fails after all retries)
  }

  retrying (error) {
    console.log(`Job [${this.constructor.name}] - status:retrying; id=${this.id} `, error.message)
  }

  succeeded (result) {
    console.log(`Job [${this.constructor.name}] - status:succeeded; id=${this.id} `, result)
  }
}

module.exports = SendEmail
