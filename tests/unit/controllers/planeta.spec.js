/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
import sinon from 'sinon';

import PlanetaController from '../../../src/controllers/planeta';
import Planeta from '../../../src/models/planeta';

describe('Controller: Planetas', () => {
  const defaultPlaneta = [
    {
      _id: '5e49c38e9f98121409d08997',
      nome: 'Yavin IV',
      clima: 'temperate, tropical',
      terreno: 'jungle, rainforests',
      createdAt: '2020-02-16T22:34:54.383Z',
      __v: 0,
    },
  ];

  const defaultRequest = {
    params: {},
  };

  describe('index() planetas', () => {
    it('deve retornar uma lista de planetas', async () => {
      const response = {
        json: sinon.spy(),
      };

      Planeta.find = sinon.stub();
      Planeta.find.withArgs({}).resolves(defaultPlaneta);

      await PlanetaController.index(defaultRequest, response);

      sinon.assert.calledWith(response.json);
    });

    it('deve retornar status 400 quando um erro ocorrer', async () => {
      const request = {};
      const response = {
        json: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);
      Planeta.find = sinon.stub();
      Planeta.find.withArgs({}).rejects({ message: 'Erro' });

      await PlanetaController.index(request, response);

      sinon.assert.calledWith(response.json);
    });
  });

  describe('findByName() planetas', () => {
    it('deve retornar uma lista de planetas encontrados pelo nome', async () => {
      const request = { query: { nome: defaultPlaneta[0].nome } };
      const response = {
        json: sinon.spy(),
      };

      Planeta.find = sinon.stub();
      Planeta.find.withArgs().resolves(defaultPlaneta);

      await PlanetaController.findByName(request, response);

      sinon.assert.calledWith(response.json);
    });

    it('deve retornar status 400 quando um erro ocorrer', async () => {
      const requestWithQuery = { query: { nome: defaultPlaneta[0].nome } };
      const response = {
        json: sinon.spy(),
        status: sinon.stub(),
      };

      Planeta.find = sinon.stub();

      Planeta.find.withArgs({ nome: defaultPlaneta[0].nome }).rejects({ message: 'Error' });

      response.status.withArgs(400).returns(response);

      await PlanetaController.findByName(requestWithQuery, response);

      sinon.assert.calledWith(response.status, 400);
    });
  });

  describe('show() planeta', () => {
    it('deve retornar um planeta', async () => {
      const fakeId = 'fake-id';
      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        json: sinon.spy(),
        status: sinon.stub(),
      };

      Planeta.findById = sinon.stub();
      Planeta.findById.withArgs(fakeId).resolves(defaultPlaneta[0]);

      await PlanetaController.show(request, response);

      sinon.assert.calledWith(response.json, defaultPlaneta[0]);
    });
  });

  describe('create() planeta', () => {
    it('deve criar um novo planeta com sucesso', async () => {
      const requestWithBody = {
        defaultRequest,
        body: defaultPlaneta[0],
      };

      const response = {
        json: sinon.spy(),
        status: sinon.stub(),
      };

      Planeta.create = sinon.stub();

      Planeta.create.withArgs().resolves(defaultPlaneta[0]);

      response.status.withArgs(201).returns(response);

      await PlanetaController.create(requestWithBody, response);

      sinon.assert.calledWith(response.json);
    });

    context('quando um erro ocorre', () => {
      it('deve retornar um erro com o status 422', async () => {
        const response = {
          json: sinon.spy(),
          status: sinon.stub(),
        };

        response.status.withArgs(422).returns(response);

        Planeta.create = sinon.stub();

        await PlanetaController.create(defaultRequest, response);

        sinon.assert.calledWith(response.status, 422);
      });
    });
  });

  describe('update() planeta', () => {
    it('deve responder com o status 200 quando um planeta for atualizado com sucesso', async () => {
      const fakeId = 'fake-id';

      const updatedPlaneta = {
        _id: fakeId,
        nome: 'Planeta atualizado',
        clima: 'tropical',
        terreno: 'jungle',
        createdAt: '2020-02-16T22:34:54.383Z',
        __v: 0,
      };

      const request = {
        params: {
          id: fakeId,
        },
        body: updatedPlaneta,
      };

      const response = {
        json: sinon.spy(),
        status: sinon.stub(),
      };

      Planeta.findByIdAndUpdate = sinon.stub();

      Planeta.findByIdAndUpdate.withArgs(fakeId, updatedPlaneta, {
        new: true,
      }).resolves(updatedPlaneta);

      response.status.withArgs(200).returns(response);

      await PlanetaController.update(request, response);

      sinon.assert.calledWith(response.json);
    });

    context('quando um erro ocorre', () => {
      it('deve retornar um erro com o status 422', async () => {
        const fakeId = 'fake-id';

        const response = {
          json: sinon.spy(),
          status: sinon.stub(),
        };

        const updatedPlaneta = {
          _id: fakeId,
          nome: 'Planeta atualizado',
          clima: 'tropical',
          terreno: 'jungle',
          createdAt: '2020-02-16T22:34:54.383Z',
          __v: 0,
        };

        const request = {
          params: {
            id: fakeId,
          },
          body: updatedPlaneta,
        };

        response.status.withArgs(422).returns(response);

        Planeta.findByIdAndUpdate = sinon.stub();

        Planeta.findByIdAndUpdate.withArgs(fakeId, updatedPlaneta, {
          new: true,
        }).rejects({ message: 'Erro' });

        await PlanetaController.update(request, response);

        sinon.assert.calledWith(response.status, 422);
      });
    });
  });

  describe('remove() planeta', () => {
    it('deve retornar com o status 204 quando o planeto for removido com sucesso', async () => {
      const fakeId = 'fake-id';

      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        json: sinon.spy(),
        status: sinon.stub(),
      };

      Planeta.deleteOne = sinon.stub();

      Planeta.deleteOne.withArgs({ _id: fakeId }).resolves();

      response.status.withArgs(204).returns(response);

      await PlanetaController.remove(request, response);

      sinon.assert.calledWith(response.status, 204);
    });

    context('quando um erro ocorre', () => {
      it('deve retornar um erro com o status 400', async () => {
        const fakeId = 'fake-id';

        const request = {
          params: {
            id: fakeId,
          },
        };
        const response = {
          json: sinon.spy(),
          status: sinon.stub(),
        };

        Planeta.deleteOne = sinon.stub();

        Planeta.deleteOne.withArgs({ _id: fakeId }).rejects({ message: 'Error' });

        response.status.withArgs(400).returns(response);

        await PlanetaController.remove(request, response);

        sinon.assert.calledWith(response.status, 400);
      });
    });
  });
});
