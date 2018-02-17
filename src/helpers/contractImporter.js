class ContractImporter {
  constructor(contract) {

  }
}

export const extend = (controller) => {
  return transform(controller, (actions, action, actionKey) => {
    const originalActions = actions;
    originalActions[actionKey] = (request, response) => {
      const ContractImporter = new ContractImporter(response);

      return action(request, response, ContractImporter)
        .catch(ContractImporter.handleError);
    };

    return originalActions;
  });
};

export default ContractImporter;
