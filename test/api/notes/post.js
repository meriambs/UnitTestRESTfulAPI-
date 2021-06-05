
 process.env.NODE_ENV  = 'test';


const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app');
const conn = require('../../../db/index');


describe("poqt /note ", ()=>{

    before(async(done)=>{
        try{ await  conn.connect()
         done();
            }
        catch (err){
            console.log(err);
            done(err)}
    })


    after(async (done)=>{
       try{
          await conn.close();
           done();
           }
       catch(err){
          console.log(err);
           done(err);
          };
             })

    it('ok, creating a new note', (done)=>{
      
        request(app).post('/notes')
        .send({name:"gggg ",text:'ggggggg'})
        .then((res)=>{
            const body = res.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('name');
            expect(body).to.contain.property('text');
            done();
        })
        .catch((err)=>done(err))
       ;
    })
})