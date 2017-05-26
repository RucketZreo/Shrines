#include "micro_thread.h"
#include <stdlib.h>

void mthread_create(
    mthread_t *ctx,
    void (*fn_addr)(void *), void *fn_arg,
    void *sk_addr, size_t sk_size)
{
    getcontext(&(ctx->uc));

    ctx->uc.uc_link = NULL;
    ctx->uc.uc_stack.ss_sp = sk_addr;
    ctx->uc.uc_stack.ss_size = sk_size;
    ctx->uc.uc_stack.ss_flags = 0;

    makecontext(&(ctx->uc), fn_addr, 0, fn_arg);
    return ;
}

void mthread_build(
    mthread_t *ctx,
    mthread_t *_old_ctx,
    void (*fn_addr)(void *), void *fn_arg,
    void *sk_addr, size_t sk_size)
{
    getcontext(&(ctx)->uc);

    ctx->uc.uc_link = &(_old_ctx->uc);
    ctx->uc.uc_stack.ss_sp = sk_addr;
    ctx->uc.uc_stack.ss_size = sk_size;
    ctx->uc.uc_stack.ss_flags = 0;

    makecontext(&(ctx->uc), fn_addr, 0, fn_arg);
    return ;
}

