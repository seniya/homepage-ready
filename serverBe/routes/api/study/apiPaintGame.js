const express = require('express');
const createError = require('http-errors');
const PaintGame = require('../../../models/paintGame')
const router = express.Router();

class PaintChatGame {

  constructor(app, io) {
    this.app = app
    // this.server = server
    this.keyword = ''
    this.clients = []
    this.contents = []
    this.imgData = []
    this.io = io
    // this.io = require('socket.io')(server, { origins: '*:*' })
    this.ioPaintChatGame = this.io.of('/study/paint-game')
    this.interval = null
    // console.log('constructor clients : ', this.clients);
  }

  registerOn() {

    this.app.use('/api/study/paint-game', router.get('/info', async (req, res, next) => {
      const defaultGame = {
        running: false,
        image: ''
      }
      try {
        const rs = await PaintGame.findOne()
        if (!rs) {
          const r = await PaintGame.create(defaultGame)
          res.send({ success: true, body: r })
        } else {
          res.send({ success: true, body: rs })
        }
      } catch (error) {
        res.send({ success: false, msg: error.message })
      }
    }));

    this.app.use('/api/study/paint-game', router.post('/update', (req, res, next) => {
      PaintGame.updateOne({ _id: req.body._id }, { $set: req.body })
        .then(rs => {
          return PaintGame.findOne({ _id: req.body._id })
        })
        .then(r => {
          res.send({ success: true, body: r })
        })
        .catch(e => {
          res.send({ success: false, msg: e.message })
        })
    }));

    this.ioPaintChatGame.on('connection', socket => {

      console.log('connection : ', socket.id)

      socket.on('reqStoreClient', data => {
        // console.log('reqStoreClient data : ', data)
        const clientInfo = new Object();
        clientInfo.player = data.player;
        clientInfo.login = Date.now();
        clientInfo.avatar = data.avatar
        clientInfo.clientId = socket.id;
        this.clients.push(clientInfo);
        console.log('reqStoreClient clients : ', this.clients.length);
        this.ioPaintChatGame.emit('resNewUser', this.clients);
      });

      socket.on('disconnect', () => {
        for (let i = 0, len = this.clients.length; i < len; ++i) {
          const c = this.clients[i];
          if (c.clientId == socket.id) {
            this.clients.splice(i, 1);
            break;
          }
        }
        console.log('disconnect clients : ', this.clients);
        this.ioPaintChatGame.emit('resOutUser', this.clients);
      });

      socket.on('reqServerChat', async (data) => {
        this.saveDataCash(data)
        console.log('reqServerChat data : ', data)
        // await this.saveDataDb(data)
        this.ioPaintChatGame.emit('resServerChat', data);
        if (data.text !== '' && this.keyword !== '' && data.text === this.keyword) {
          console.log('game win')
          this.ioPaintChatGame.emit('resGameWin', data);
        }
      });

      socket.on('reqImgData', async (data) => {
        if (data.type === 'draw') {
          if (data.line !== null) {
            this.imgData.push(data.line)
          }
        } else {
          this.imgData = []
        }
        console.log('reqImgData data : ', data)
        this.ioPaintChatGame.emit('resImgData', this.imgData);
      });

      socket.on('reqKeyword', async (data) => {
        this.keyword = data
        console.log('reqKeyword data : ', this.keyword)
        this.ioPaintChatGame.emit('resKeyword', this.keyword);
      });

      socket.on('reqResetGame', async (paintGameObj) => {
        this.keyword = ''
        this.clients = []
        this.contents = []
        this.imgData = []
        if (this.interval) {
          clearInterval(this.interval)
        }
        PaintGame.updateOne({ _id: paintGameObj._id }, { $set: paintGameObj })
          .then(r => {
            console.log('reqResetGame')
            this.ioPaintChatGame.emit('resResetGame', true)
          })
          .catch(e => {
            console.error(e.message)
            this.ioPaintChatGame.emit('resResetGame', true)
          })
      });

      socket.on('reqResetTimer', async () => {
        if (this.interval) {
          clearInterval(this.interval)
        }
        this.ioPaintChatGame.emit('resResetTimer', 100);
      })

      socket.on('reqTimer', async (data) => {
        console.log('reqTimer : ', data)
        const maxTime = data
        let time_ = data
        let result = 1

        if (this.interval) {
          clearInterval(this.interval)
        }

        this.interval = setInterval(() => {
          result = (time_ / maxTime) * 100
          if (time_ < 1) {
            this.ioPaintChatGame.emit('resTimer', 0);
            clearInterval(this.interval)
          } else {
            time_ -= 1
            this.ioPaintChatGame.emit('resTimer', result);
          }
        }, 1000)
      });
    });
  }

  saveDataCash(data) {
    this.contents.push(data)
  }


}

module.exports = PaintChatGame;