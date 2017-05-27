#ifndef __MICRO_THREAD_H__
#define __MICRO_THREAD_H__

#if defined(__linux__)
#define _XOPEN_SOURCE 700
#elif defined(__unix__)
#define _BSD_SOURCE
#endif

#include <ucontext.h>

typedef int mthread_id;

struct _mthread_t;
typedef struct _mthread_t {
    ucontext_t uc;
} mthread_t;

#define mthread_save(ctx) \
    (void)getcontext(&(ctx)->uc)

#define mthread_restore(ctx) \
    (void)setcontext(&(ctx)->uc)

#define mthread_switch(old_ctx, new_ctx) \
    (void)swapcontext(&((old_ctx)->uc), \
                      &((new_ctx)->uc))

void mthread_create(
    mthread_t *ctx,
    void (*fn_addr)(void *), void *fn_arg,
    void *sk_addr, size_t sk_size);

void mthread_register(const ucontext_t *uc);

void mthread_schedule_loop(void);
#endif
