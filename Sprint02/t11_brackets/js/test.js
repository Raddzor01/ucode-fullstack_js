describe("Tests", () => {
    it('Test with incorrect input 1', () => {
        assert.equal(checkBrackets(NaN), -1, "Error in test with incorrect input 1!");
    });

    it('Test with incorrect input 2', () => {
        assert.equal(checkBrackets(false), -1, "Error in test with incorrect input 2!");
    });

    it('Test with incorrect input 3', () => {
        assert.equal(checkBrackets(undefined), -1, "Error in test with incorrect input 3!");
    });

    it('Test with incorrect input 4', () => {
        assert.equal(checkBrackets(12346n), -1, "Error in test with incorrect input 4!");
    });

    it('Test with incorrect input 5', () => {
        assert.equal(checkBrackets(14.1), -1, "Error in test with incorrect input 5!");
    });

    it('Test with normal input 1', () => {
        assert.equal(checkBrackets(')'), 1, "Error in test with normal input 1!");
    });

    it('Test with normal input 2', () => {
        assert.equal(checkBrackets('gdsfgjudsfhlgusdluifvbujds)hkdfghjsdf'), 1, "Error in test with normal input 2!");
    });

    it('Test with normal input 3', () => {
        assert.equal(checkBrackets('(((())((()'), 4, "Error in test with normal input 3!");
    });

    it('Test with normal input 4', () => {
        assert.equal(checkBrackets('((((('), 5, "Error in test with normal input 4!");
    });

    it('Test with normal input 5', () => {
        assert.equal(checkBrackets('((((())'), 3, "Error in test with normal input 3!");
    });

    it('Test with normal input 6', () => {
        assert.equal(checkBrackets('((((())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))'), 123, "Error in test with normal input 6!");
    });

    it('Test with normal input 7', () => {
        assert.equal(checkBrackets('(f=fsdfhsdfdsfgvdsfv)((((hfdfhgsfhuvb()))'), 2, "Error in test with normal input 7!");
    });

    it('Test with normal input 8', () => {
        assert.equal(checkBrackets('(((((idk what else))'), 3, "Error in test with normal input 8!");
    });

    it('Test with normal input 9', () => {
        assert.equal(checkBrackets('(((((ifsaddkfd)(()sa wha)(asdf()t el()es))'), 3, "Error in test with normal input 9!");
    });

    it('Test with normal input 10', () => {
        assert.equal(checkBrackets('(                    (      )( dasf) df()))   '), 1, "Error in test with normal input!");
    });
});

mocha.run();
