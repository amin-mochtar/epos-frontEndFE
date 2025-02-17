import { MagnumApi } from 'react-native-magnum-plugin';

const magnumApi = new MagnumApi();
const LANGUAGE = 'id_ID';
const DB_KEY = 'prudential-life-assurance-indonesia';
const RULEBASE_PATH = 'magnum-assets/resources/MagnumRuleBase.json';
// const test = require('../../../magnum-assets/resources/MagnumRuleBase.json')

const magnumStartUp = () =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await magnumApi.startup(DB_KEY);
      if (res.Success) {
        resolve(res);
      } else {
        reject(res.ApiErrorObject);
      }
    } catch (error) {
      reject(error);
    }
  });

const magnumStartCase = (caseId: any, bootstrapJson: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await magnumApi.startCase(bootstrapJson, caseId, LANGUAGE);
      if (res.Success) {
        resolve(res);
      } else {
        reject(res.ApiErrorObject);
      }
      resolve('Case Started!');
    } catch (error) {
      reject(error);
    }
  });

const getVersion = async () => {
  return await magnumApi.getVersion();
};

const magnumSyncRuleBase = () =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await magnumApi.syncRulebaseFromPath(RULEBASE_PATH);
      if (res.Success) {
        resolve(res);
      } else {
        // TODO CATCH ERROR
        reject(res.ApiErrorObject);
      }
    } catch (error) {
      // TODO CATCH ERROR
      reject(error);
    }
  });

const magnumResumeCase = (caseId: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const appFormModel = await magnumApi.resumeCase(caseId);
      if (appFormModel.Success) {
        resolve(appFormModel);
      } else {
        reject(appFormModel.ApiErrorObject);
      }
      resolve(appFormModel);
    } catch (error) {
      reject(error);
    }
  });

const magnumGetCaseAnswers = (caseId: string) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const caseAnswer = await magnumApi.getCaseAnswers(caseId);
      if (caseAnswer.Success) {
        resolve(caseAnswer);
      } else {
        reject(caseAnswer.ApiErrorObject);
      }
      resolve(caseAnswer);
    } catch (error) {
      reject(error);
    }
  });

const magnumGetSubmitPackage = (caseId: string) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const submittedPackage = await magnumApi.getSubmitPackage(caseId, true);
      if (submittedPackage.Success) {
        resolve(submittedPackage);
      } else {
        reject(submittedPackage.ApiErrorObject);
      }
      resolve(submittedPackage);
    } catch (error) {
      reject(error);
    }
  });
const magnumGetNavigation = (id: string, lifeIndex: number) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const navigationForLife = await magnumApi.getNavigationForLife(id, lifeIndex);
      if (navigationForLife.Success) {
        resolve(navigationForLife);
      } else {
        reject(navigationForLife.ApiErrorObject);
      }
      resolve(navigationForLife);
    } catch (error) {
      reject(error);
    }
  });

//
const magnumImportCase = (caseImportJson: any) => new Promise(async (resolve, reject) => {
  try {
    const res = await magnumApi.importCase(caseImportJson, true);
    if (res.Success) {
      resolve(res);
    } else {
      // saveLog(CONSTANT.ERROR, `import magnum error | ${JSON.stringify(res.ApiErrorObject)}`);
      reject(res.ApiErrorObject);
    }
    resolve('Import Success!');
  } catch (error) {
    reject(error);
  }
});

// case id === proposalId
const magnumExportCase = (caseId: string) => new Promise(async (resolve, reject) => {
  try {
    const caseData = await magnumApi.exportCase(caseId);
    if (caseData?.Success) {
      resolve(caseData);
    } else {
      reject(caseData.ApiErrorObject);
    }
    resolve(caseData);
  } catch (error) {
    // TODO CATCH ERROR
    reject(error);
  }
});


const bulkMagnumExport = async (caseIds: string[]) => {
  const promises = caseIds.map(caseId => magnumExportCase(caseId));

  try {
    // Use Promise.all to wait for all promises to resolve or reject
    const results = await Promise.all(promises.map(promise =>
      promise
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    ));

    // Separate fulfilled and rejected promises
    const successfulExports = results.filter(result => result.status === 'fulfilled').map(result => result.value);
    const failedExports = results.filter(result => result.status === 'rejected').map(result => result.reason);

    return { successfulExports, failedExports };
  } catch (error) {
    console.error('Error in bulkMagnumExport:', error);
    throw error;
  }
};

const bulkMagnumImport = async (proposalData: string[]) => {
  const promises = proposalData.map(data => magnumImportCase(data.magnumData!));

  try {
    // Use Promise.all to wait for all promises to resolve or reject
    const results = await Promise.all(promises.map(promise =>
      promise
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    ));

    // Separate fulfilled and rejected promises
    const successfulExports = results.filter(result => result.status === 'fulfilled').map(result => result.value);
    const failedExports = results.filter(result => result.status === 'rejected').map(result => result.reason);

    return { successfulExports, failedExports };
  } catch (error) {
    console.error('Error in bulkMagnumExport:', error);
    throw error;
  }
};

const initializeSyncMagnum = async () => {
  const magnumStart: any = await magnumStartUp();
  const magnumSyncStart: any = await magnumSyncRuleBase();
  if (magnumStart?.Success) console.log('Init Magnum Success')
  else console.log('init magnum failed');
  if (magnumSyncStart?.Success) console.log('init Magnum rule base Sync');
  else console.log('init mangum rule base Sync Failed')
}

export {
  magnumStartUp,
  magnumStartCase,
  getVersion,
  magnumSyncRuleBase,
  magnumResumeCase,
  magnumGetCaseAnswers,
  magnumGetSubmitPackage,
  magnumGetNavigation,
  magnumImportCase,
  magnumExportCase,
  bulkMagnumExport,
  bulkMagnumImport,
  initializeSyncMagnum
};
