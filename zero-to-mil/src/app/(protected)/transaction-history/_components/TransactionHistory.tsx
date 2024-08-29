import React from "react";

function TransactionHistory() {
  return (
    <div className="bg-input p-4">
      <div>
        <p>test</p>
      </div>
      <div className="text-sm space-y-2 border-t border-muted pt-2 mt-2">
        {" "}
        <div className="flex justify-between">
          <p>Events:4</p>
          <p>4 of 4 completed</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-muted">Odds:</p>
            <p>5.6</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted">Bet:</p>
            <p>{`$45`}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted">Status:</p>
            <p className="text-destructive">Lost</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
