/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import Planeta from '../../../src/models/planeta';

describe('Routes: Planetas', () => {
  const defaultId = '5e4e00d29df1b635d80b4ceb';
  const defaultPlaneta = {
    nome: 'Default planeta',
    terreno: 'jungle',
    clima: 'tropical',
  };
  const expectedPlaneta = {
    __v: 0,
    _id: defaultId,
    nome: 'Default planeta',
    terreno: 'jungle',
    clima: 'tropical',
  };

  beforeEach(async () => {
    await Planeta.deleteMany();

    const planeta = new Planeta(defaultPlaneta);
    planeta._id = '5e4e00d29df1b635d80b4ceb';

    const planetaCriated = await planeta.save();

    return planetaCriated;
  });

  afterEach(async () => await Planeta.deleteMany());

  describe('GET /planetas', () => {
    it('deve retornar uma lista de planetas', (done) => {
      request
        .get('/api/v1/planetas')
        .end((err, res) => {
          expect(res.body).to.eql([expectedPlaneta]);
          done(err);
        });
    });

    context('quando um id for especificado', (done) => {
      it('deve retornar uma reposta com status 200 e um planeta', (done) => {
        request
          .get(`/api/v1/planetas/${defaultId}`)
          .end((err, res) => {
            expect(res.statusCode).to.eql(200);
            expect(res.body).to.eql(expectedPlaneta);
            done(err);
          });
      });
    });
  });

  describe('POST /planetas', () => {
    context('quando cria um planeta', () => {
      it('deve responder com um novo planeta e o status 201', (done) => {
        const customId = '56cb91bdc3464f14678934ba';
        const newPlaneta = {
          _id: customId,
          __v: 0,
          ...defaultPlaneta,
        };

        const expectedSavedPlaneta = {
          __v: 0,
          _id: customId,
          nome: 'Default planeta',
          terreno: 'jungle',
          clima: 'tropical',
        };

        request
          .post('/api/v1/planetas')
          .send(newPlaneta)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSavedPlaneta);
            done(err);
          });
      });
    });
  });

  describe('PUT /planetas/:id', () => {
    context('quando atualiza um planeta', () => {
      it('deve responder com o planeta atualizado e com status 200', (done) => {
        const customPlaneta = {
          name: 'Custom name',
        };
        const updatedPlaneta = { ...customPlaneta, ...defaultPlaneta };

        request
          .put(`/api/v1/planetas/${defaultId}`)
          .send(updatedPlaneta)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });

  describe('DELETE /planetas/:id', () => {
    context('quando remove um planeta', () => {
      it('deve responder com o status 204', (done) => {
        request
          .delete(`/api/v1/planetas/${defaultId}`)
          .end((err, res) => {
            expect(res.status).to.eql(204);
            done(err);
          });
      });
    });
  });
});
