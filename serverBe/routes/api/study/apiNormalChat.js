const express = require('express');
const createError = require('http-errors');
const Chat = require('../../../models/chat')
const router = express.Router();

class NormalChat {

  constructor(app, io) {
    this.app = app
    // this.server = server;
    this.clients = []
    this.contents = []
    this.io = io;
    this.ioNormalChat = this.io.of('/study/normal-chat');
    // console.log('constructor clients : ', this.clients);
  }

  registerOn() {

    this.app.use('/api/study/simple-chat', router.post('/checkName', (req, res, next) => {
      const { user } = req.body
      // console.log('/api/study/simple-chat/checkName user : ', user)

      let check = this.clients.find(c => c.name === user);
      // console.log('check : ', check)

      if (check === undefined) {
        res.send({ success: true, body: user })
      } else {
        res.send({ success: false, msg: '잘못된 이름입니다' })
      }

    }));

    this.ioNormalChat.on('connection', socket => {

      console.log('ioNormalChat connection : ', socket.id)

      socket.on('reqStoreClient', data => {

        // console.log('reqStoreClient data : ', data)

        const clientInfo = new Object();
        clientInfo.name = data.name;
        clientInfo.login = Date.now();
        clientInfo.avatar = data.avatar
        clientInfo.clientId = socket.id;
        this.clients.push(clientInfo);
        // console.log('reqStoreClient clients : ', this.clients.length);
        this.ioNormalChat.emit('resNewUser', this.clients);
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
        this.ioNormalChat.emit('resOutUser', this.clients);
      });

      socket.on('reqServerChat', async (data) => {
        this.saveDataCash(data)
        // console.log('reqServerChat this.contents length : ', this.contents.length)

        await this.saveDataDb(data)

        this.ioNormalChat.emit('resServerChat', data);
      });

      socket.on('reqAllContents', async (data) => {
        // console.log('this.contents length : ', this.contents.length)
        const oldContents = await this.getContents()
        console.log('reqAllContents oldContents : ', oldContents);
        this.ioNormalChat.emit('resAllContents', oldContents);
      });


    });
  }

  saveDataCash(data) {
    this.contents.push(data)
  }

  async saveDataDb(data) {
    await Chat.create(data)
      .then(r => {
        // console.log('chat save success r:', r)
        this.contents.push(data)
      })
      .catch(e => {
        console.log('saveDataDb e:', e.message)
      })
  }

  async getContents() {
    let oldContents = this.contents
    // return oldContents

    await Chat.find()
      .then(rs => {
        // console.log('getContents rs : ', rs)
        oldContents = rs
      })
      .catch(e => {
        console.log('getContents e:', e.message)
      })

    return oldContents
  }
}

module.exports = NormalChat;