PARSERS=lib/parsers
BIN=node_modules/.bin
.PHONY : all dev

# Targets
all:
	$(BIN)/pegjs $(PARSERS)/css.pegjs
	$(BIN)/pegjs $(PARSERS)/html.pegjs
