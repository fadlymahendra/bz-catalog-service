def getCommitHash() {
    sh "echo RELOAD PIPELINE.GROOVY"
    sh "git rev-parse --short HEAD > .git/commit-id"
    def COMMIT_HASH = readFile('.git/commit-id').trim()
    return COMMIT_HASH
}

def gitTagName() {
    commit = getCommit()
    if (commit) {
        desc = sh(script: "git describe --tags ${commit}", returnStdout: true)?.trim()
        if (isTag(desc)) {
            return desc
        }
    }
    return null
}

/** @return The tag message, or `null` if the current commit isn't a tag. */
def gitTagMessage() {
    name = gitTagName()
    msg = sh(script: "git tag -n10000 -l ${name}", returnStdout: true)?.trim()
    if (msg) {
        return msg.substring(name.size()+1, msg.size())
    }
    return null
}

def getCommit() {
    return sh(script: 'git rev-parse HEAD', returnStdout: true)?.trim()
}

def isTag(String desc) {
    match = desc =~ /.+-[0-9]+-g[0-9A-Fa-f]{6,}$/
    result = !match
    match = null // prevent serialisation
    return result
}

return this;
