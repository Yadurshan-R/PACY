use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/transaction.{OutputReference, Transaction}

pub type CertificateDatum {
  student_name: String,
  course: String,
  issued_date: String,
  university_admin: VerificationKeyHash,
}

pub type Redeemer {
  action: ByteArray,
}

validator mint_certificate {
  spend(
    datum: Option<CertificateDatum>,
    redeemer: Redeemer,
    _own_ref: OutputReference,
    tx: Transaction,
  ) {
    expect Some(CertificateDatum { university_admin, .. }) = datum

    let valid_action = redeemer.action == "mint"

    let signed_by_admin = list.has(tx.extra_signatories, university_admin)

    valid_action && signed_by_admin
  }

  else(_) {
    fail
  }
}
