const ACTIONS = {
    // you are trying to join a room
    JOIN: 'join',
    // you have joined a room - confirmation
    JOINED: 'joined',
    // you are disconnected from the room - internet issues etc.
    DISCONNECTED: 'disconnected',
    // Re-render the page if a client makes any changes
    CODE_CHANGE: 'code-change',
    // 
    SYNC_CODE: 'sync-code',
    // you leave the room
    LEAVE: 'leave',
};

module.exports = ACTIONS;