#include <solana_sdk.h>

uint64_t share(SolParameters *params) {

  if (params->ka_num < 1) {
    sol_log("Missing instructions");
    return ERROR_NOT_ENOUGH_ACCOUNT_KEYS;
  }

  for (size_t i = 0; i < param->ka_num; i++)
  {
    SolAccountInfo *account = &params->ka[i];

    char *json = (char *)account->data;
  }

  return SUCCESS;
}

extern uint64_t entrypoint(const uint8_t *input) {
  SolAccountInfo accounts[1];
  SolParameters params = (SolParameters){.ka = accounts};

  if (!sol_deserialize(input, &params, SOL_ARRAY_SIZE(accounts))) {
    return ERROR_INVALID_ARGUMENT;
  }

  return share(&params);
}
