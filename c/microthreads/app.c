#include "micro_thread.h"
#include <stdio.h>

#define STACK_SIZE 64000

void routineA(void *argument) {
    printf("A\n");
}

void routineB(void *argument) {
    printf("B\n");
}

int main(int argc, char *argv[]) {
  mthread_t subroutineA, subroutineB, Main;
  printf("Main routine\n");
  mthread_create(&subroutineA, &routineA, NULL, malloc(STACK_SIZE), STACK_SIZE);
  mthread_build(&subroutineB, &subroutineA, &routineB, NULL, malloc(STACK_SIZE), STACK_SIZE);
  mthread_switch(&Main, &subroutineB);
  printf("switching");
  mthread_switch(&subroutineB, &subroutineA);
  return 0;
}


