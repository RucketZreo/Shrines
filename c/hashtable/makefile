CC = gcc
CFLAGS = -g -Wall -Werror -std=c99
OBJECTS = main.o hash_table.o
build: app
app: $(OBJECTS)
	$(CC) $(CFLAGS) -o artifact.bin $(OBJECTS)
main.o: hash_table.h
clean:
	rm -rf *.o *.bin
