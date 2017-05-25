CC=gcc
CFLAGS=-g -Wall -std=c99
SRCS := app.c micro_thread.c
PSRCS := $(SRCS:.c=.e)
OBJ := $(SRCS:.c=.o)
default: main
main: $(OBJ)
	$(CC) $(CFLAGS) -o main.bin $(OBJ)
%.o: %.h
%.e: %.c
	$(CC) $(CFLAGS) -E $< -o $@
clean:
	$(RM) $(OBJ) main.bin *.e
	echo $(APP_PATH)
precompile: $(PSRCS)
